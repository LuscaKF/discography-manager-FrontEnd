import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AlbumList from './components/AlbumList';
import AddAlbumForm from './components/AddAlbumForm';
import EditAlbumForm from './components/EditAlbumForm';
import TrackList from './components/TrackList';
import AddTrackForm from './components/AddTrackForm';
import EditTrackForm from './components/EditTrackForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AlbumList />} />
        <Route path="/add-album" element={<AddAlbumForm />} />
        <Route path="/edit-album/:id" element={<EditAlbumForm />} />
        <Route path="/albums/:albumId/tracks" element={<TrackList />} />
        <Route path="/add-track/:albumId" element={<AddTrackForm />} />
        <Route path="/edit-track/:albumId/:trackId" element={<EditTrackForm />} />
      </Routes>
    </Router>
  );
};

export default App;
