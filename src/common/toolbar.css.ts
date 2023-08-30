import { Styles } from '@ijstech/components';
import { currentTheme } from '../theme/index';
const Theme = currentTheme;

const tileToolbarFadeIn = Styles.keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

Styles.cssRule('ide-toolbar', {
  display: 'block',
  position: 'relative',
  $nest: {
    '.ide-component.active, .ide-component.hover-border': {
      outline: `2px solid ${Theme.colors.primary.main}`
    },
    '.ide-component': {
      border: `1px solid transparent`,
      outline: 'none',
      boxSizing: 'border-box'
    },
    'i-button': {
      boxShadow: 'none'
    },
    '.active': {
      zIndex: 110
    },
    'i-scom-markdown-editor i-markdown-editor': {
      width: 'auto !important'
    },
    '.ide-toolbar': {
      position: 'absolute',
      zIndex: 99,
      top: -50,
      left: 0,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px 0px',
      animation: `${tileToolbarFadeIn} 125ms cubic-bezier(0.4,0,1,1)`
    },
    '.toolbar': {
      width: 34,
      height: 34,
      padding: 6,
      borderRadius: 5,
      cursor: 'pointer',
      $nest: {
        '&:hover i-icon svg': {
          fill: `${Theme.colors.primary.main} !important`,
          transition: 'fill .15s ease-in'
        }
      }
    },
    '#form': {
      display: 'block'
    },
    '#form > i-vstack > i-panel': {
      width: '100%'
    },
    '.resize-icon': {
      cursor: 'ew-resize',
      opacity: 0,
      transition: '125ms',
      border: '1px solid #fff',
      borderRadius: '50%'
    },
    '&.active .resize-icon': {
      opacity: 1
    },
    '&.is-dragging .resize-icon': {
      display: 'none'
    },
    '.nw-resize': {
      cursor: 'nw-resize !important'
    },
    '.ne-resize': {
      cursor: 'ne-resize !important'
    },
    '.n-resize': {
      cursor: 'n-resize !important'
    },
    '.move': {
      cursor: 'grab'
    },
    '.dragger': {
      cursor: 'grab',
      opacity: 0,
      visibility: 'hidden',
      transform: 'translateX(-50%)',
      zIndex: 10
    },
    '&:hover': {
      $nest: {
        '.dragger': {
          visibility: 'initial',
          opacity: 0.48,
          transition: 'opacity .3s .3s cubic-bezier(0.4,0,0.2,1), visibility 0s .2s'
        }
      }
    },
    '&.is-textbox': {
        $nest: {
          'i-markdown-editor': {
            cursor: 'text',
            userSelect: 'text',
            $nest: {
              '&::selection': {
                background: Theme.colors.primary.main,
                color: Theme.colors.primary.contrastText
              }
            }
          },
          'i-scom-markdown-editor': {
            padding: '0.75rem 0 0'
          }
        }
    }
  }
})


Styles.cssRule('.setting-modal', {
  visibility: 'hidden',
  $nest: {
    '.i-modal_header': {
      padding: '1rem 1.5rem 0.5rem',
      fontSize: '1rem',
      fontWeight: 600
    },
    'i-button': {
      padding: '0.5rem 1rem'
    },
    'i-color': {
      display: 'flex',
      $nest: {
        '.i-color': {
          height: '30px !important',
          marginBlock: 'auto'
        }
      }
    },
    'i-input': {
      // border: `1px solid var(--builder-divider)`,
      // marginBottom: '1rem'
    },
    '.modal': {
      // padding: 0,
      borderRadius: 5,
      // boxShadow: 'rgba(0, 0, 0, 0.15) 0px 10px 50px -5px',
      $nest: {
        '#pnlForm > * > *:first-child': {
          padding: '1rem 1.5rem 0',
          maxHeight: 'calc(100vh - 114px)',
          overflowY: 'auto',
          justifyContent: 'start',
          $nest: {
            '&::-webkit-scrollbar': {
              width: '7px',
            },
            '&::-webkit-scrollbar-track': {
              borderRadius: '10px',
              border: '1px solid transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: Theme.colors.primary.main,
              borderRadius: '10px',
              outline: '1px solid transparent'
            },
          }
        },
        '#pnlForm > * > *:last-child': {
          padding: '0 1.5rem 1rem'
        }
      }
    },
    'i-tabs': {
      $nest: {
        '> .tabs-nav-wrap': {
          margin: 0,
          $nest: {
            '.tabs-nav': {
              border: 0,
              // borderRight: `1px solid var(--builder-divider)`,
              paddingRight: '0.5rem'
            },
            'i-tab': {
              background: 'transparent',
              border: 0,
              borderRadius: '0.25rem',
              color: Theme.text.primary,
              // fontFamily: Theme.typography.fontFamily,
              fontSize: '0.875rem',
              marginBottom: 0,
            },
            'i-tab:not(.disabled).active': {
              background: Theme.action.selected,
              color: Theme.text.primary,
              fontWeight: 600,
            },
            'i-tab:not(.disabled):hover': {
              background: Theme.action.hover,
              color: Theme.text.primary,
            },
            'i-tab .tab-item': {
              padding: '0.5rem 0.75rem',
            },
          }
        },
      }
    }
  }
})
