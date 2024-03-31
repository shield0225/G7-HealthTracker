import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const WeekController = ({ showReset, reset, prevWeek, nextWeek, monthScope }) => {
    return <Stack direction="row" spacing={1} my={1} alignItems="center">
        {showReset && <Button onClick={reset}>Reset</Button>}
        <Tooltip title="Previous Week">
            <IconButton onClick={prevWeek}>
                <IconChevronLeft width="20" height="20" />
            </IconButton>
        </Tooltip>
        <Tooltip title="Next Week">
            <IconButton onClick={nextWeek}>
                <IconChevronRight width="20" height="20" />
            </IconButton>
        </Tooltip>
        <Typography variant="h6">{monthScope}</Typography>
    </Stack>
}

export default WeekController;