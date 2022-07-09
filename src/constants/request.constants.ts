export const SUCCESS = 'success';
export const PENDING = 'pending';
export const FAILED = 'failed';
export const NOT_STARTED = 'not started';

export const REQUEST_NOT_STARTED = ({data=null,message}:{data:any,message?:string}) => {
  return {
     data,
     message,
     status:NOT_STARTED
  }
}

export const REQUEST_SUCCESS = ({data=null,message}:{data:any,message?:string}) => {
  return {
     data,
     message,
     status:SUCCESS
  }
}
export const REQUEST_FAILED = ({data=null,message}:{data:any,message?:string}) => {
  return {
     data,
     message,
     status:FAILED
  }
}
export const REQUEST_PENDING = ({data=null,message}:{data:any,message?:string}) => {
  return {
     data,
     message,
     status:PENDING
  }
}