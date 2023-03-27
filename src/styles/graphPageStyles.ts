// @ts-ignore
enum FlexDirection {
  row = 'row',
  column = 'column'
}

export const totalWrapperStyle = {
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'height': '90vh',
  'flexDirection': FlexDirection.row
};

export const treeWrapperStyle = {
  'display': 'flex',
  'justifyContent': 'top',
  'flexDirection': FlexDirection.column,
  'backgroundColor': '#282c34',
  'padding': '1rem',
  'borderRadius': '10px',
  'boxShadow': '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  'margin': '20px',
  'border': '1px solid #e0e0e0',
  'color': 'white',
  "height": "80vh",
  'maxWidth': '20vw',
  'overflow': 'auto'
};

export const functionInfoWrapperStyle = {
  display: 'flex',
  flexDirection: FlexDirection.column,
  backgroundColor: '#282c34',
  padding: '1rem',
  color: 'white',
  borderRadius: '10px',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  margin: '20px',
  marginTop: '0px',
  border: '1px solid #e0e0e0',
  height: 'fit-content'
};