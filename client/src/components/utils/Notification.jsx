import { useSelector } from 'react-redux'
import { Alert, Box } from '@mui/material'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return null
  }

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Alert severity={notification.type === 'error' ? 'error' : 'success'}>
        {notification.message}
      </Alert>
    </Box>
  )
}

export default Notification
