import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import agent from '../../agent';

import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
} from '../../constants/actionTypes';
import CommentContainer from './CommentContainer';
import style from './Article.module.css';
import { Link } from 'react-router-dom';
import { ucFirst } from '../../utils/string';
import ArticleActions from './ArticleActions/ArticleActions';

const mapStateToProps = (state) => ({
  ...state.article,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
});

class Article extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Articles.get(this.props.match.params.id),
        agent.Comments.forArticle(this.props.match.params.id),
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.article) {
      return null;
    }

    const markup = {
      __html: marked(this.props.article.body, { sanitize: true }),
    };

    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username === this.props.article.author.username;
    return (
      <div className={style.articlePage}>
        <div className={style.articleHeader}>
          <div className={style.headerInfo}>
            <Link to={`/@${this.props.article.author.username}`}>
              <img
                src={this.props.article.author.image}
                alt={this.props.article.author.username}
                className={style.userImage}
              />
            </Link>
            <div className={style.headerText}>
              <Link
                className={style.author}
                to={`/@${this.props.article.author.username}`}
              >
                {this.props.article.author.username}
              </Link>
              <span className={style.date}>
                {ucFirst(
                  new Date(this.props.article.createdAt).toLocaleDateString(
                    'ru',
                    {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }
                  )
                )}
              </span>
            </div>
          </div>
          <ArticleActions article={this.props.article} canModify={canModify} />
        </div>
        <h1 className={style.title}>{this.props.article.title}</h1>

        <div dangerouslySetInnerHTML={markup} className={style.body}></div>
        <CommentContainer
          comments={this.props.comments || []}
          errors={this.props.commentErrors}
          slug={this.props.match.params.id}
          currentUser={this.props.currentUser}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
