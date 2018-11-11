const drawerWidth = 240;

export default theme => ({
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginTop: theme.spacing.unit * 8,
    zIndex: theme.zIndex.appBar - 1 // Required to make toolbar go beneath appBar
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  menuItem: {},
  activeMenuItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      '& $menuItemLabel, & $menuItemIcon': {
        color: theme.palette.common.white
      }
    },
    backgroundColor: theme.palette.primary.main,
    '& $menuItemLabel, & $menuItemIcon': {
      color: theme.palette.common.white
    }
  },
  menuItemLabel: {},
  menuItemIcon: {},
  main: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 9,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  mainShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
});
