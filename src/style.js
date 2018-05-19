import colorJs from 'color-js';

export { merge } from 'glamor';
export { keyframes } from 'glamor';

export function color (input) {
    return colorJs(input);
}

export const baseLength = 12;

export const flex = {
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap'
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
	alignStart: {
		alignItems: 'flex-start'
	},
	alignEnd: {
		alignItems: 'flex-start'
	},
    alignCenter: {
        alignItems: 'center'
    },
    justifyEnd: {
        justifyContent: 'flex-end'
    },
    fluid: {
        flex: '1 1 auto'
    },
    fixed: {
        flex: '0 0 auto'
    }
};

export const display = {
    block: {
        display: 'block'
    }
};

export const position = {
    relative: { position: 'relative' },
    fixed: { position: 'fixed' },
    absolute: { position: 'absolute' },

    absoluteCenter: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

export const border = {
    harsh: {
		border: Math.round(baseLength * 1/12) + 'px solid black',
		borderRadius: Math.round(baseLength * 2/12) + 'px',
    }
};

export const connotation = {
    interactive: {
        ':hover': {
            cursor: 'pointer'
        }
    },
	immutable: {
    	userSelect: 'none'
	}
};

export const steno = {
	nowrap: {
		whiteSpace: 'nowrap'
	},
    base: {
		fontFamily: 'sans-serif',
		fontSize: Math.round(baseLength) + 'px',
		color: 'black'
	},
    header: {
		fontSize: Math.round(baseLength * 16/12) + 'px',
		lineHeight: Math.round(baseLength * 30/12) + 'px',
		fontWeight: 'bold'
    },
    clickable: {
		...connotation.interactive,
		textDecoration: 'none',
		color: 'inherit'
    }
};

// glamor.insertGlobal('a[data-command]:hover, a[href]:hover', theme.inverseFocused);
