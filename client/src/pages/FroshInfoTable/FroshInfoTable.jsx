import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FroshInfoTable.scss';
import { fields } from '../Registration/RegistrationFields';
import { getRequestedFroshData } from './functions';
import { Button } from '../../components/button/Button/Button';
import exportFromJSON from 'export-from-json';
import { useDispatch, useSelector } from 'react-redux';
import { froshSelector } from '../../state/frosh/froshSlice';
import { getFrosh } from '../../state/frosh/saga';

function getUneditableFields() {
  let noEditFields = [];
  for (let key1 of Object.keys(fields)) {
    for (let key2 of Object.keys(fields[key1])) {
      if (fields[key1][key2].noEdit) {
        noEditFields.push(key2);
      }
    }
  }
  return noEditFields;
}

function downloadDataAsXML(data) {
  const fileName = 'froshData';
  let fields = [];
  const exportType = 'xml';
  exportFromJSON({ data, fileName, fields, exportType });
}

const PageFroshInfoTable = () => {
  const noEditFields = getUneditableFields();
  const froshData = getRequestedFroshData();
  const { frosh } = useSelector(froshSelector);
  const [objectKeys, setObjectKeys] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFrosh());
  }, []);

  useEffect(() => {
    frosh?.length > 0 && setObjectKeys(Object.keys(frosh[0]));
  }, [frosh]);

  return (
    <div className="frosh-info-table">
      <div className="navbar-space-top" />
      <div className="header">
        <h1>Frosh Data</h1>
        <div style={{ display: 'block' }}>
          <Button
            label="Download XML"
            onClick={() => {
              downloadDataAsXML(frosh);
            }}
          />
        </div>
      </div>
      <p className="small-print">
        Note: Frosh are able to edit their information. This data is only accurate to the point it
        was loaded. Keep in mind, any data extracted from this page may be subject to change.{' '}
        {noEditFields.length >= 0 ? (
          <>
            The fields that cannot be edited by the frosh currently:{' '}
            <b>{noEditFields.toString()}</b>
          </>
        ) : (
          <></>
        )}
      </p>
      <div className="table-wrap">
        {frosh.length >= 0 ? (
          <table>
            <tr>
              <th>#</th>
              {objectKeys.map((key) => {
                return <th key={key}>{key}</th>;
              })}
            </tr>
            {frosh.map((datum, index) => {
              return (
                <tr key={index}>
                  <td>
                    <b>{index}</b>
                  </td>
                  {objectKeys.map((key) => {
                    return <td key={key + index}>{datum?.[key]}</td>;
                  })}
                </tr>
              );
            })}
          </table>
        ) : (
          <h2>No data</h2>
        )}
      </div>
    </div>
  );
};

export { PageFroshInfoTable };
