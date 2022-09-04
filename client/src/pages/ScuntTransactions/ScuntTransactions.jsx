import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScuntTransactions.scss';
import useAxios from '../../hooks/useAxios';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { getScuntTeamObjFromTeamName } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Button } from '../../components/button/Button/Button';
const { axios } = useAxios();

export const ScuntTransactions = () => {
  const [assignedTeam, setAssignedTeam] = useState('');
  const [teams, setTeams] = useState(['Select Team']);
  const [teamObjs, setTeamObjs] = useState();
  const [teamDetails, setTeamDetails] = useState();
  const [pointTransactions, setPointTransactions] = useState([]);

  const getScuntTeams = async () => {
    try {
      const response = await axios.get('/scunt-teams');
      const { teamPoints } = response.data;
      if (teamPoints.length <= 0 || !teamPoints) setTeams([]);
      else {
        setTeamObjs(teamPoints);
        setTeams(
          teamPoints.map((team) => {
            return team?.name;
          }),
        );
      }
    } catch (e) {
      setTeams(['Error loading teams']);
    }
  };

  const getTeamTransactions = async () => {
    try {
      const response = await axios.post('/scunt-teams/transactions', {
        teamNumber: getScuntTeamObjFromTeamName(assignedTeam, teamObjs)?.number,
      });
      const transactions = response?.data?.message?.transactions;
      setPointTransactions(transactions);
      setTeamDetails(response?.data?.message);
    } catch (e) {
      setPointTransactions(['Error loading transactions']);
    }
  };

  const getMoreTransactions = async () => {
    try {
      const response = await axios.post('/scunt-teams/transactions/more', {
        teamNumber: getScuntTeamObjFromTeamName(assignedTeam, teamObjs)?.number,
        alreadyDownloaded: pointTransactions?.length,
      });
      const transactions = response?.data?.message?.transactions;
      setPointTransactions([...pointTransactions, transactions]);
    } catch (e) {
      setPointTransactions(['Error loading more transactions']);
    }
  };

  useEffect(() => {
    getScuntTeams();
  }, []);

  useEffect(() => {
    getTeamTransactions();
  }, [assignedTeam]);

  return (
    <>
      <div className="navbar-space-top"></div>
      <div className="scunt-point-transactions-page">
        <div className="scunt-point-transactions-container">
          <h1>Point Transactions</h1>
          <div className="separator" />
          <p>Transactions of all points that have been distributed to teams</p>
          <div className="separator" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button label={'Refresh'} onClick={() => {}} />
            <h2>Team:</h2>
            <div style={{ width: '10px' }}></div>
            <Dropdown
              initialSelectedIndex={0}
              values={teams}
              onSelect={(value) => {
                setAssignedTeam(value);
              }}
              isDisabled={false}
              localStorageKey={'scunt-team-choice'}
            />
          </div>
          <div className="transactions-list">
            <h2>
              {teamDetails?.name}: {teamDetails?.points} points
            </h2>
            <div style={{ height: '10px' }}></div>
            {pointTransactions.map((pointTransaction, index) => {
              return (
                <div key={index.toString()}>
                  <p>
                    <b>{(index + 1).toString()}.</b> {pointTransaction?.name}:{' '}
                    {pointTransaction?.points} points
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
