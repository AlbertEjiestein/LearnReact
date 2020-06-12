import { getPosts } from '../services'
import actionTypes from './actionTypes'

const startFetchBlogList = () => {
  return {
    type: actionTypes.START_FETCH_BLOG_LIST,
    isLoading: true,
    errMsg: ''
  }
}

const fetchBlogListSuccess = (payload) => {
  return {
    type: actionTypes.FETCH_BLOG_LIST_SUCCESS,
    isLoading: false,
    payload,
    errMsg: ''
  }
}

const fetchBlogListFailure = () => {
  return {
    type: actionTypes.FETCH_BLOG_LIST_FAILURE,
    isLoading: false,
    errMsg: '出错了'
  }
}

export const fetchBlogList = () => dispatch => {
  dispatch(startFetchBlogList())

  getPosts()
    .then(resp => {
      console.log(resp)
      if(resp.status === 200){
        dispatch(fetchBlogListSuccess({
          list: resp.data
        }))
      }else{
        dispatch(fetchBlogListFailure())
      }
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchBlogListFailure())
    })
}