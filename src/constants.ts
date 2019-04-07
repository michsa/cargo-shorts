// --- default settings --- //

export const pocketDefaults = {
    name: [
        "Memes", "Cat photos", "Weird YouTube videos", "Articles", "Stuff",
        "Job listings", "Things", "Recipes", "Insurance quotes", "Blogs",
        "Totally legal downloads", "Let's plays", "Inspirational quotes",
        "Possible ARGs", "Vacation pics", "Reaction GIFs", "Computer parts",
        "Groceries", "Free apps", "Flash games", "Podcasts", "Webcomics",
        "Food porn", "Books", "Tutorials", "TED talks", "Research papers"
    ],
    icon: [
        ':sunglasses:', ':joy:', ':ok_hand:', ':muscle:', ':strawberry:',
        ':pumpkin:', ':mage:', ':sparkles:', ':sun_with_face:', ':rainbow:',
        ':floppy_disk:', ':phone:', ':candle:', ':books:', ':briefcase:',
        ':shopping_trolley:', ':100:', ':nerd_face:', ':wink:', ':scream:',
        ':heart_eyes:', ':grimacing:', ':japanese_goblin:', ':ghost:',
        ':alien:', ':space_invader:', ':merperson:', ':shrug:', ':dancers:',
        ':pray:', ':sparkling_heart:', ':sweat_drops:', ':peach:', ':socks:',
        ':eggplant:', ':high_heel:', ':crown:', ':lipstick:', ':lizard:',
        ':camel:', ':hatching_chick:', ':pig:', ':sheep:', ':unicorn_face:',
        ':dragon:', ':squid:', ':snail:', ':tulip:', ':palm_tree:', ':whale:',
        ':mushroom:', ':pizza:', ':camera:', ':selfie:', ':joystick:', ':tada:'
    ],
    color: [
        "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4",
        "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107",
        "#ff9800", "#ff5722", "#795548"
    ]
}

export const NEW_POCKET = 'NEW_POCKET'
export const REMOVE_POCKET = 'REMOVE_POCKET'
export const MODIFY_POCKET = 'MODIFY_POCKET'

export const NEW_TAB = 'NEW_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const MOVE_TAB = 'MOVE_TAB'

export const UPDATE_CURRENT_TAB = 'UPDATE_CURRENT_TAB'
export const REQUEST_CURRENT_TAB_INFO = 'REQUEST_CURRENT_TAB_INFO'

export const ROUTE = 'ROUTE'
export const ROUTE_NEW_POCKET = 'route/NEW_POCKET'
export const ROUTE_EDIT_POCKET = 'route/EDIT_POCKET'
export const ROUTE_POCKET_LIST = 'route/POCKET_LIST'



// background actions??

export const POCKET_ADD = 'pocket/ADD'
export const POCKET_DELETE = 'pocket/DELETE'
export const POCKET_MODIFY = 'pocket/MODIFY'
export const POCKET_REORDER = 'pocket/REORDER'
export const POCKET_ASSIGN_TAB = 'pocket/ASSIGN_TAB'
export const POCKET_UNASSIGN_TAB = 'pocket/UNASSIGN_TAB'

export const TAB_ADD = 'tab/ADD'
export const TAB_DELETE = 'tab/DELETE'
export const TAB_REORDER = 'tab/REORDER'
export const TAB_UPDATE = 'tab/UPDATE'
export const TAB_UPDATE_CURRENT = 'tab/UPDATE_CURRENT'

export const API_REQUEST_TAB_INFO = 'api/REQUEST_INFO'
