const iconStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1,
  fontSize: 10,
};

const SortDesc = () => (
  <span style={iconStyle}>
    <span className="text-blue-500">▲</span>
    <span className="text-blue-100">▼</span>
  </span>
);

const SortAsc = () => (
  <span style={iconStyle}>
    <span className="text-blue-100">▲</span>
    <span className="text-blue-500">▼</span>
  </span>
);

const SortDefault = () => (
  <span style={iconStyle}>
    <span className="text-blue-100">▲</span>
    <span className="text-blue-100">▼</span>
  </span>
);

export default { SortDesc, SortAsc, SortDefault };
