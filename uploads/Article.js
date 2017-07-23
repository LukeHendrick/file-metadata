import React, { Component } from 'react';
import { Image, Row, Col  } from 'react-bootstrap';
class Article extends Component {
  render() {
    if (this.props.abstract.length > 300) {
      var abstract = this.props.abstract.slice(0,300) + '...'
    } else {
      abstract = this.props.abstract
    }
    return (
        <Row className='border-div'>
          <Col><h1>{this.props.title}</h1></Col>
          <Col><Image alt={'placeholder'} src={this.props.image} /></Col>
        <Col><p>{abstract}</p></Col>
        </Row>
    )
  }
}

export default Article;
