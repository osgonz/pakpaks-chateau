import ReactMarkdown from 'markdown-to-jsx';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const options = {
    overrides: {
        p: {
            component: Typography,
            props: { paragraph: true, variant: "body2" },
        },
        a: { 
            component: Link,
            props: { variant: "body2" },
        },
        li: {
            component: (({ ...props }) => (
                <li>
                    <Typography 
                        component="span"
                        variant="body2"
                        {...props}
                    />
                </li>
            ))
        },
    },
};

const Markdown = (props: any) => {
    return (
        <ReactMarkdown 
            options={options}
            {...props}
        />
    );
};

export default Markdown;