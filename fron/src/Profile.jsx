import React, { Component } from 'react'
import { Layout, Avatar, Row, Col, Tabs, Icon, Button } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Nav from './Nav'
import Myfooter from './Myfooter'
import ProfileArticleList from './ProfileArticleList'

const TabPane = Tabs.TabPane

class Profile extends Component {
  state = {
    data: [],
    urlAvatar: ''
  }

  componentDidMount = async (v) => {
    await this.getProfileData()
  }

  getProfileData = async (v) => {
    try {
      const response = await axios.get(
        'https://guoliang.online:8080/api/users/' + window.localStorage.getItem('user_id') + '/?format=json'
      )
      this.data = response.data.results
      console.log('qfrg', response.data)
      this.setState(function (state) {
        return { urlAvatar: response.data.last_name }
      })
    } catch (error) {
      console.log(error)
    }
  }
  render () {
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Nav />
        <Row style={{ flex: '1 0', padding: '60px' }} >
          <Col xl={{ span: 5, offset: 1 }} lg={{ span: 7, offset: 1 }} xs={{ span: 24 }} >
            <Avatar size={180} shape='square' src={this.state.urlAvatar} icon='user' style={{ color: '#ffffff', backgroundColor: '#f6f6f6' }} />
            <h1 style={{ paddingTop: '10px' }}>{this.props.match.params.id}</h1>
            <Button block style={{ backgroundColor: '#f6f6f6' }}>
              <Link to='/settings/profile'>Edit</Link>
            </Button>
          </Col>
          <Col xl={{ span: 17, offset: 1 }} lg={{ span: 15, offset: 1 }} xs={{ span: 24 }} >
            <Tabs defaultActiveKey='1'>
              <TabPane tab={<span><Icon type='read' />我的文章</span>} key='1'>
                <ProfileArticleList />
              </TabPane>
              <TabPane tab={<span><Icon type='rest' />我的草稿</span>} key='2'>
      等会写...
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <Myfooter />
      </Layout>
    )
  }
}

export default Profile
