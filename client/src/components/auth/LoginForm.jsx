import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@mui/material'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    onLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, maxWidth: 400 }}>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </Box>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
