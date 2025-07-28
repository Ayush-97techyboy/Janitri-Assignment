import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import DeviceInventory from './pages/DeviceInventory'
import InstallationTraining from './pages/InstallationTraining'
import ServiceVisits from './pages/ServiceVisits'
import AMCTracker from './pages/AMCTracker'
import AlertsPhotoLogs from './pages/AlertsPhotoLogs'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import styles from './App.module.scss'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <div className={styles.appContainer}>
      <Header onMenuClick={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <main className={styles.appMain}>
        <Routes>
          <Route path="/" element={<DeviceInventory />} />
          <Route path="/installation-training" element={<InstallationTraining />} />
          <Route path="/service-visits" element={<ServiceVisits />} />
          <Route path="/amc-tracker" element={<AMCTracker />} />
          <Route path="/alerts-photo-logs" element={<AlertsPhotoLogs />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
