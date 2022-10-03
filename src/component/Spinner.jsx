import logo from './../spin.png';
import Avatar from '@mui/material/Avatar';
import {Tooltip} from "@mui/material";

const renderAvatar = props => (
  <Tooltip title={props.candidate.name} followCursor>
    <Avatar alt={props.candidate.name} src={props.candidate.avatar} sx={{ width: "40vmin", height: "40vmin" }}  />
  </Tooltip>
);

const renderSpinner = props => (
    <img src={logo} className="App-logo" alt="logo" />
);

export default function Spinner(props) {
    return props.candidate ? renderAvatar(props) : renderSpinner(props);
}