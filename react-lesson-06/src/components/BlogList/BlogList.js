import React, { Component } from 'react'
import { connect } from 'react-redux'
import BlogItem from './BlogItem'
import {
  fetchBlogList
} from '../../actions/blog'

class BlogList extends Component {
  componentDidMount(){
    this.props.fetchBlogList()
  }

  render() {
    const {
      list,
      isLoading,
      errMsg
    } = this.props

    return (
      isLoading
      ?
      <div>loading...</div>
      :
      (
        errMsg
        ?
        <div>{errMsg}</div>
        :
        <ul>
          {
            list.map(item => {
              return <BlogItem key={item.id} {...item}/>
            })
          }
        </ul>
      )
    )
  }
}

const mapStateToProps = state => {
  return {
    list: state.blog.list,
    isLoading: state.blog.isLoading,
    errMsg: state.blog.errMsg
  }
}


export default connect(mapStateToProps, {fetchBlogList})(BlogList)