import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { selectGists, selectGistsError, selectGistsLoading } from '../../store/gists/selectors';
import { getAllGists } from '../../store/gists/actions';

import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import styles from './Gists.module.css'

export const GistsList = () => {
  const gists = useSelector(selectGists);
  const error = useSelector(selectGistsError);
  const loading = useSelector(selectGistsLoading);

  const dispatch = useDispatch();

  const requestGists = () => {
    dispatch(getAllGists());
  };

  return (
    <div className={styles.center}>
      <h1 className={styles.title}>GistsList</h1>
      <Button
        variant="contained"
        onClick={requestGists}
      >
        Get Gists
      </Button>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      <ul>
        {!loading && gists.map((gist) => (
          <Box key={gist.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <li>{gist.description}</li>
          </Box>
        ))}
      </ul>
      {error &&
        <p style={{ color: 'red' }}>{error}</p> &&
        <button onClick={requestGists}>Retry</button>}
    </div>
  )
}