import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

function Results(props) {

    function mapper(array) {
        return array.map(
            sum => (
                <ListItem key={`${sum.id}`}>
                    <ListItemAvatar>
                        <DragHandleIcon />
                    </ListItemAvatar>
                    <ListItemText primary={`${sum.total}`} secondary={`Suma: ${sum.summand_one} + ${sum.summand_two}, realizada el ${new Date(sum.created_at).toLocaleDateString()} a las ${new Date(sum.created_at).toLocaleTimeString()}`} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => props.action(sum.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        )
    }

    return (
        <List>
            {(props.array.length > 0) ?
                mapper(props.array)
                :
                <Box p={2}>
                    <Alert severity="info">Realiza una suma</Alert>
                </Box>
            }
        </List>
    );
}

export default Results;