import logo from './../spin.png';
import Avatar from '@mui/material/Avatar';

const renderAvatar = props => (
    <Avatar alt={props.candidate.name} src={props.candidate.avatar} sx={{ width: "40vmin", height: "40vmin" }}  />
);

const renderSpinner = props => (
    <img src={logo} className="App-logo" alt="logo" />
);

export default function Spinner(props) {
    return props.candidate ? renderAvatar(props) : renderSpinner(props);
}