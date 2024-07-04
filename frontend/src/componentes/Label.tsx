import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const LabelInfo = ({texto}: {texto: string}) => {
    return (
        <>
            <Box 
                sx={{  
                    background: 'linear-gradient(45deg, green, darkblue, lightblue)',
                    borderRadius: 50
                }}
            >
                <Typography sx={{ color: 'white', marginLeft: 2, marginY: 1 }}>{texto}</Typography>
            </Box>
        </>
    )
}

export default LabelInfo;