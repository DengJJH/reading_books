import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import fetchData from '../helpers/fetchData';

export default class Post extends Component {
    constructor(props) {
        super(props);

        if (props.staticContext && props.staticContext.data) {
            console.log(1);
            this.state = {
                post: props.staticContext.data
            };
        } else {
            console.log(2);
            this.state = {
                post: {},
            };
        }
    }
    componentDidMount() {
        if (window.__ROUTE_DATA__) {
            this.setState({
                post: window.__ROUTE_DATA__,
            });
            delete window.__ROUTE_DATA__;
        } else {
            fetchData().then(data => {
                this.setState({
                    post: data,
                });
            })
        }
    }
    render() {
        const post = this.state.post;
        return (
            <div>
                <h1>发布</h1>
                <Link to="/">首页</Link>
                <h2>{ post.title }</h2>
                <p>链接<a href={post.url} target="_blank">{post.url}</a></p>
            </div>
        );
    }
};
