// @ts-ignore
enum FlexDirection {
  row = 'row',
  column = 'column'
}

export const totalWrapperStyle = {
  'display': 'flex',
  'justifyContent': 'center',
  'height': '90vh',
  'flexDirection': FlexDirection.row
};

export const treeWrapperStyle = {
  'display': 'flex',
  'justifyContent': 'top',
  'flexDirection': FlexDirection.column,
  'padding': '1rem',
  'borderRadius': '10px',
  'color': 'white',
  "maxHeight": "80vh",
  "minHeight": "50vh",
  "minWidth": "50vh",
  'overflow': 'auto'
};

export const functionInfoWrapperStyle = {
  display: 'flex',
  position: "absolute",
  top: "11vh",
  left: "2rem",
  flexDirection: FlexDirection.column,
  padding: '0.5rem',
  color: 'white',
  boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
  border: '1px solid #e0e0e0',
  borderRadius: '10px',
  height: 'fit-content',
  zIndex: 4

};
