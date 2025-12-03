import InferenceService from './inference.service.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ValidationService {
  constructor(logger) {
    this.inferenceService = new InferenceService(logger);
    this.log = logger || console;
  }

  /**
   * Load test cases from JSON file
   */
  async loadTestCases() {
    try {
      const testCasesPath = path.join(
        __dirname,
        '../../seed/validation_cases.json',
      );
      const data = await fs.readFile(testCasesPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      this.log.error('Error loading test cases:', error);
      throw new Error('Gagal memuat test cases');
    }
  }

  /**
   * Run a single diagnosis and return result
   */
  async runSingleDiagnosis(symptoms) {
    const result = await this.inferenceService.diagnose(symptoms);
    return result;
  }

  /**
   * Main validation function
   * Returns comprehensive validation metrics
   */
  async validateSystem() {
    this.log.info('Starting system validation...');
    const testCases = await this.loadTestCases();

    const results = {
      totalCases: testCases.length,
      correctDiagnoses: 0,
      correctDiagnosesWithThreshold: 0,
      cfThreshold: 0.4, // CF minimum untuk dianggap valid
      cfStats: {
        min: 1,
        max: 0,
        sum: 0,
        avg: 0,
        correctAvg: 0,
        incorrectAvg: 0,
      },
      confusionMatrix: {},
      perDiseaseMetrics: {},
      detailedResults: [],
      timestamp: new Date().toISOString(),
    };

    let correctCfSum = 0;
    let incorrectCfSum = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    // Run each test case
    for (const testCase of testCases) {
      try {
        const diagnosisResult = await this.runSingleDiagnosis(
          testCase.symptoms,
        );

        // Get top disease (highest CF)
        // diagnosisResult is an array directly, not {diseases: [...]}
        const topDisease =
          diagnosisResult && diagnosisResult.length > 0
            ? diagnosisResult[0]
            : null;

        if (!topDisease) {
          this.log.warn(`Test case ${testCase.id}: No diagnosis found`);
          continue;
        }

        const predictedDisease = topDisease.name;
        const predictedCF = topDisease.cf;

        // Check if prediction is correct
        const isCorrect = predictedDisease === testCase.expectedDisease;
        const meetsThreshold = predictedCF >= results.cfThreshold;
        const isCorrectWithThreshold = isCorrect && meetsThreshold;

        if (isCorrect) {
          results.correctDiagnoses++;
          correctCfSum += predictedCF;
          correctCount++;
        } else {
          incorrectCfSum += predictedCF;
          incorrectCount++;
        }

        if (isCorrectWithThreshold) {
          results.correctDiagnosesWithThreshold++;
        }

        // Update CF stats
        results.cfStats.sum += predictedCF;
        results.cfStats.min = Math.min(results.cfStats.min, predictedCF);
        results.cfStats.max = Math.max(results.cfStats.max, predictedCF);

        // Update confusion matrix
        if (!results.confusionMatrix[testCase.expectedDisease]) {
          results.confusionMatrix[testCase.expectedDisease] = {};
        }
        if (
          !results.confusionMatrix[testCase.expectedDisease][predictedDisease]
        ) {
          results.confusionMatrix[testCase.expectedDisease][
            predictedDisease
          ] = 0;
        }
        results.confusionMatrix[testCase.expectedDisease][predictedDisease]++;

        // Store detailed result
        results.detailedResults.push({
          testCaseId: testCase.id,
          description: testCase.description,
          expected: testCase.expectedDisease,
          predicted: predictedDisease,
          cf: predictedCF,
          meetsThreshold,
          isCorrect,
          isCorrectWithThreshold,
          allDiseases: diagnosisResult.map((d) => ({
            name: d.name,
            cf: d.cf,
          })),
        });
      } catch (error) {
        this.log.error(`Error in test case ${testCase.id}:`, error);
        results.detailedResults.push({
          testCaseId: testCase.id,
          description: testCase.description,
          expected: testCase.expectedDisease,
          error: error.message,
        });
      }
    }

    // Calculate final statistics
    results.cfStats.avg = results.cfStats.sum / results.totalCases;
    results.cfStats.correctAvg =
      correctCount > 0 ? correctCfSum / correctCount : 0;
    results.cfStats.incorrectAvg =
      incorrectCount > 0 ? incorrectCfSum / incorrectCount : 0;

    results.accuracy = (results.correctDiagnoses / results.totalCases) * 100;
    results.accuracyWithThreshold =
      (results.correctDiagnosesWithThreshold / results.totalCases) * 100;

    // Calculate per-disease metrics (precision, recall, F1)
    results.perDiseaseMetrics = this.calculatePerDiseaseMetrics(
      results.confusionMatrix,
    );

    this.log.info('Validation completed');
    return results;
  }

  /**
   * Calculate precision, recall, and F1-score per disease
   */
  calculatePerDiseaseMetrics(confusionMatrix) {
    const metrics = {};
    const diseases = Object.keys(confusionMatrix);

    for (const disease of diseases) {
      // True Positives: correctly predicted as this disease
      const tp = confusionMatrix[disease][disease] || 0;

      // False Positives: predicted as this disease but actually other disease
      let fp = 0;
      for (const actualDisease of diseases) {
        if (actualDisease !== disease) {
          fp += confusionMatrix[actualDisease][disease] || 0;
        }
      }

      // False Negatives: actually this disease but predicted as other
      let fn = 0;
      for (const predictedDisease of Object.keys(confusionMatrix[disease])) {
        if (predictedDisease !== disease) {
          fn += confusionMatrix[disease][predictedDisease] || 0;
        }
      }

      const precision = tp + fp > 0 ? tp / (tp + fp) : 0;
      const recall = tp + fn > 0 ? tp / (tp + fn) : 0;
      const f1Score =
        precision + recall > 0
          ? (2 * (precision * recall)) / (precision + recall)
          : 0;

      metrics[disease] = {
        truePositives: tp,
        falsePositives: fp,
        falseNegatives: fn,
        precision: Math.round(precision * 1000) / 1000,
        recall: Math.round(recall * 1000) / 1000,
        f1Score: Math.round(f1Score * 1000) / 1000,
      };
    }

    return metrics;
  }

  /**
   * Get validation summary (lighter version without detailed results)
   */
  async getValidationSummary() {
    const fullResults = await this.validateSystem();

    // Remove detailed results to make response lighter
    const { detailedResults, ...summary } = fullResults;

    return {
      ...summary,
      totalDetailedResults: detailedResults.length,
    };
  }
}

export default ValidationService;
