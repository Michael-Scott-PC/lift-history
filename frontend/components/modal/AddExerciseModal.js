import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import AddExerciseFormikNEW from '../form/formik/AddExerciseFormikNEW';
import AddExerciseFormik from '../form/formik/AddExerciseFormik';
import CloseButton from '../button/CloseButton';
import SearchBar from '../form/formik/SearchBar';

const AddExerciseModal = ({
  showAddExModal,
  setShowAddExModal,
  dataSWR,
  authReducer,
  profile,
}) => {
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [primaryExerciseSelected, setPrimaryExercise] = useState({});
  const [localPickDate, setLocalPickDate] = useState('');
  const [localPrimarySetsAndReps, setLocalPrimarySetsAndReps] = useState([
    { sets: '', reps: '', weight: '', rpe: '', pct: '' },
  ]);
  const [localSecondarySetsAndReps, setLocalSecondarySetsAndReps] = useState([
    { sets: '', reps: '', weight: '', rpe: '', pct: '' },
  ]);
  const [localThirdSetsAndReps, setLocalThirdSetsAndReps] = useState([
    { sets: '', reps: '', weight: '', rpe: '', pct: '' },
  ]);

  const clearFormCloseModal = () => {
    setPrimaryExercise('');
    setLocalPickDate('');
    setShowExerciseForm(false);
    setShowAddExModal(false);
    setLocalPrimarySetsAndReps([
      { sets: '', reps: '', weight: '', rpe: '', pct: '' },
    ]);
    setLocalSecondarySetsAndReps([
      { sets: '', reps: '', weight: '', rpe: '', pct: '' },
    ]);
    setLocalThirdSetsAndReps([
      { sets: '', reps: '', weight: '', rpe: '', pct: '' },
    ]);
  };

  return (
    <Modal
      show={showAddExModal}
      onHide={() => clearFormCloseModal()}
      style={{ position: 'fixed', top: '5%' }}
      scrollable
    >
      <Modal.Header style={{ backgroundColor: '#000', color: '#fff' }}>
        <Modal.Title style={{ width: '100%', textAlign: 'center' }}>
          Add Exercise
        </Modal.Title>
        <CloseButton handleOnClick={clearFormCloseModal} />
      </Modal.Header>
      <Modal.Body>
        {/* <SearchBar
          setShowExerciseForm={setShowExerciseForm}
          setPrimaryExercise={setPrimaryExercise}
        /> */}
        <AddExerciseFormikNEW
          setShowAddExModal={setShowAddExModal}
          authReducer={authReducer}
          profile={profile}
          dataSWR={dataSWR}
        />
        {/* <AddExerciseFormik
          showExerciseForm={showExerciseForm}
          setShowExerciseForm={setShowExerciseForm}
          primaryExerciseSelected={primaryExerciseSelected}
          setPrimaryExercise={setPrimaryExercise}
          localPickDate={localPickDate}
          setLocalPickDate={setLocalPickDate}
          setLocalPrimarySetsAndReps={setLocalPrimarySetsAndReps}
          setLocalSecondarySetsAndReps={setLocalSecondarySetsAndReps}
          setLocalThirdSetsAndReps={setLocalThirdSetsAndReps}
          localPrimarySetsAndReps={localPrimarySetsAndReps}
          localSecondarySetsAndReps={localSecondarySetsAndReps}
          localThirdSetsAndReps={localThirdSetsAndReps}
          setShowAddExModal={setShowAddExModal}
          dataSWR={dataSWR}
        /> */}
      </Modal.Body>
    </Modal>
  );
};

AddExerciseModal.propTypes = {
  showAddExModal: PropTypes.bool.isRequired,
  setShowAddExModal: PropTypes.func.isRequired,
};

export default AddExerciseModal;
