export const responseSuccess = (message, data) => {
   return {
      status: true,
      message: message,
      data: data
   }
}

export const responseFailed = (message, error) => {
   return {
      status: false,
      message: message,
      error: error
   }
}