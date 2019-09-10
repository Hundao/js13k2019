heroSkin = {
    'priority': ['face', 'cloth', 'hair', 'eye', 'bow', 'hand', 'left-foot', 'right-foot'],
    // 'priority': ['cloth'],
    'hair': {
        'main': {
            'color': '#040000',
            'points': [
                [[2, 1], [7, 9]],
                [[8, 1], [12, 5]],
                [[13, 2], [18, 4]],
                [[6, 0], [9, 0]],
                [3, 0], [11, 0], [12, 0], [15, 0],
                [[15, 1], [17, 1]],
                [19, 1],
                [[1, 2], [1, 6]],
                [0, 3], [19, 3], [19, 3],
                [19, 4],
                [0, 5],
                [0, 6], [8, 6], [9, 6], [16, 6], [17, 6], [18, 6],
                [8, 7], [[17, 7], [19, 7]],
                [1, 8], [19, 8],
                [[0, 9], [2, 9]], [10, 9],
                [0, 10], [1, 10], [10, 10], [11, 10],
                [11, 11],
                [[3, 10], [6, 12]],
                [6, 13]
            ]
        }
    },
    'face': {
        'main': {
            'color': '#F9D4A5',
            'points': [
                [[6, 5], [15, 13]],
                [[16, 6], [16, 12]],
                [[17, 8], [17, 10]],
                [[6, 14], [9, 14]]
            ]
        }
    },
    'eye': {
        'main': {
            'color': '#FFFFFF',
            'points': [
                [15, 9]
            ]
        }
    },
    'cloth': {
        'main': {
            'color': '#404040',
            'points': [
                [[3, 13], [16, 30]],
                [[17, 15], [17, 29]]
            ]
        }
    },
    'hand': {
        'border': {
            'color': '#000000',
            'points': [
                [[7, 18], [7, 25]],
                [[13, 17], [13, 25]],
                [[7, 26], [13, 26]]
            ]
        },
        'body': {
            'color': '#F9D4A5',
            'points': [
                [[9, 27], [12, 28]]
            ]
        }
    },
    'bow': {
        'wood': {
            'color': '#77634C',
            'points': [
                [0, 21], [19, 21],
                [0, 22], [1, 22], [18, 22], [19, 22],
                [1, 23], [2, 23], [18, 23],
                [[2, 24], [5, 24]], [17, 24], [18, 24],
                [[3, 25], [5, 25]], [16, 25], [17, 25],
                [[6, 26], [8, 26]], [15, 26], [16, 26],
                [[6, 27], [15, 27]],
                [[8, 28], [12, 28]]
            ]
        },
        'line': {
            'color': '#777268',
            'points': [
                [[1, 26], [1, 18]]
            ]
        }
    },
    'left-foot': {
        'pants': {
            'color': '#0E0E0E',
            'points': [
                [[3, 31], [8, 37]]
            ]
        },
        'foot': {
            'color': '#F9D4A5',
            'points': [
                [[3, 38], [8, 39]]
            ]
        }
    },
    'right-foot': {
        'pants': {
            'color': '#0E0E0E',
            'points': [
                [[12, 31], [17, 37]]
            ]
        },
        'foot': {
            'color': '#F9D4A5',
            'points': [
                [[12, 38], [17, 39]]
            ]
        }
    }
}

heroShootSkin = JSON.parse(JSON.stringify(heroSkin))
heroShootSkin.hand = {
    'main': {
        'color': '#F9D4A5',
        'points': [
            [[7, 19], [7, 22]],
            [8, 19]
        ]
    }
}

heroShootSkin.bow = {
    'wood': {
        'color': '#77634C',
        'points': [
            [12, 9], [13, 9],
            [[13, 10], [15, 11]],
            [[16, 11], [17, 13]], [15, 12],
            [17, 14], [17, 15],
            [[18, 14], [18, 19]],
            [[19, 17], [19, 26]],
            [[18, 24], [18, 29]],
            [[17, 28], [17, 31]],
            [16, 30], [16, 31], [15, 31], [15, 32],
            [14, 32], [14, 33], [13, 33]
        ]
    },
    'line': {
        'color': '#777268',
        'points': [
            [[12, 10], [12, 12]],
            [[11, 12], [11, 14]],
            [[10, 14], [10, 16]],
            [[9, 16], [9, 19]],
            [[8, 20], [8, 22]],
            [[9, 23], [9, 24]],
            [[10, 24], [10, 26]],
            [[11, 26], [11, 29]],
            [[12, 29], [12, 31]],
            [[13, 31], [13, 32]]
        ]
    },
    'arrow': {
        'color': '#55461F',
        'points': [
            [[9, 21], [13, 22]],
            [[13, 20], [18, 21]]
        ]
    }
}

heroMoveSkin = JSON.parse(JSON.stringify(heroSkin))
delete heroMoveSkin['left-foot']
delete heroMoveSkin['right-foot']
heroMoveSkin.priority.push('foot')
heroMoveSkin['foot'] = {
    'pants': {
        'color': '#0E0E0E',
        'points': [
            [[5, 29], [15, 30]],
            [[6, 31], [14, 31]],
            [[8, 32], [14, 32]],
            [[7, 33], [14, 33]],
            [[6, 34], [15, 34]],
            [[5, 35], [9, 35]], [[12, 35], [16, 35]],
            [[6, 36], [8, 36]], [[14, 36], [16, 36]],
            [15, 37], [16, 37]
        ]
    },
    'foot': {
        'color': '#F9D4A5',
        'points': [
            [4, 37], [5, 37], [12, 37], [16, 37],
            [[4, 38], [7, 39]], [3, 39],
            [12, 38], [13, 38], [16, 38], [17, 38],
            [[12,39], [17,39]]
        ]
    }
}

heroMoveAndShoot = JSON.parse(JSON.stringify(heroSkin))
delete heroMoveAndShoot['left-foot']
delete heroMoveAndShoot['right-foot']
heroMoveAndShoot.priority.push('foot')
heroMoveAndShoot.foot = heroMoveSkin['foot']
heroMoveAndShoot.hand = heroShootSkin.hand
heroMoveAndShoot.bow = heroShootSkin.bow


arrowSkin = {
    'priority': ['arrow'],
    'arrow': {
        'wood': {
            'color': '#55461F',
            'points': [
                [[0, 4], [6, 4]]
            ]
        },
        'sliver': {
            'color': '#C7D3CF',
            'points': [
                [[7, 2], [7, 6]],
                [[8, 3], [8, 5]],
                [9, 4]
            ]
        },
        'brown-feather': {
            'color': '#999886',
            'points': [
                [1, 2], [2, 3], [2, 5], [1, 6]
            ]
        },
        'black-feather': {
            'color': '#182219',
            'points': [
                [0, 2], [1, 3], [1, 5], [0, 6]
            ]
        }
    }
}
