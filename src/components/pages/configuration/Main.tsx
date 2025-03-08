import * as Mui from '@mui/material'
import Layout from '../../Page'

const Box = Mui.styled(Mui.Box)<Mui.BoxProps>(() => ({
  display: 'flex',
  flex: 1,
  padding: '0 0 3rem 2rem'
}))

const FormControl = Mui.styled(Mui.FormControl)<Mui.FormControlProps>(() => ({
  flex: 1,
  width: '100%'
}))

const TextField = Mui.styled(Mui.TextField)<Mui.TextFieldProps>(() => ({
  flex: 1,
}))

const RadioButtonFormLabel = Mui.styled(Mui.FormLabel)<Mui.FormLabelProps>(() => ({
  margin: 'auto 1rem auto 0'
}))

function Main() {
  return (
    <Layout>
      <FormControl>
        <Mui.Box component="form">
          <Box>
            <TextField
              id="timeout-textfield"
              label="Scan time out"
              defaultValue="5000"
              variant="filled"
              type="number"
            />
          </Box>
          <Box>
            <TextField
              id="page-size-textfield"
              label="Page size"
              defaultValue="10"
              variant="filled"
              type="number"
            />
          </Box>
          <Box>
            <RadioButtonFormLabel id="theme-radio-buttons-group-label">
              Theme
            </RadioButtonFormLabel>
            <Mui.RadioGroup
              row
              aria-labelledby="theme-radio-buttons-group-label"
              name="theme-radio-buttons-group"
            >
              <Mui.FormControlLabel value="light" control={<Mui.Radio />} label="Light" />
              <Mui.FormControlLabel value="dark" control={<Mui.Radio />} label="Dark" />
            </Mui.RadioGroup>
          </Box>
          <Box sx={{ justifyContent: 'flex-end' }}>
            <Mui.Button type="submit">Save</Mui.Button>
          </Box>
        </Mui.Box>
      </FormControl>
    </Layout>
  )
}

export default Main
