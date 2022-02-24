import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../../../agent';
import Button from '../../common/Button/Button';
import { EditIcon, DeleteIcon } from '../../../images/icons';
import { DELETE_ARTICLE } from '../../../constants/actionTypes';

import styles from './ArticleActions.module.css';

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = ({ article, canModify, onClickDelete }) => {
  const del = () => {
    onClickDelete(agent.Articles.del(article.slug));
  };
  if (canModify) {
    return (
      <span className={styles.buttons}>
        <Link to={`/editor/${article.slug}`}>
          <Button isActive icon={<EditIcon />} title="Редактировать запись" />
        </Link>

        <Button
          onClick={del}
          isActive
          isBackground={false}
          icon={<DeleteIcon />}
          title="Удалить запись"
        />
      </span>
    );
  }
  return '';
};

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);
