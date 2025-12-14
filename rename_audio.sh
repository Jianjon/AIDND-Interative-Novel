#!/bin/bash
cd "public/assets/audio"

# Helper function to rename if source exists
rename_if_exists() {
    if [ -f "$1" ]; then
        mv "$1" "$2"
    fi
}

rename_if_exists "240_Throne_Room拷貝.mp3" "throne_room.mp3"
rename_if_exists "242_Spiders_Den拷貝.mp3" "spiders_den.mp3"
rename_if_exists "275_Lorekeeper_Grove拷貝.mp3" "lorekeeper_grove.mp3"
rename_if_exists "281_Escape_from_Shadow拷貝.mp3" "escape_from_shadow.mp3"
rename_if_exists "311_Swamp_Thing拷貝.mp3" "swamp_thing.mp3"
rename_if_exists "315_Dragon_Rider拷貝.mp3" "dragon_rider.mp3"
rename_if_exists "316_Goblin_Ambush拷貝.mp3" "goblin_ambush.mp3"
rename_if_exists "343_Dungeon_Collapse拷貝.mp3" "dungeon_collapse.mp3"
rename_if_exists "351_Halfling_Lodge拷貝.mp3" "halfling_lodge.mp3"
rename_if_exists "356_Adventure_Begins拷貝.mp3" "adventure_begins.mp3"
rename_if_exists "369_Troll_Grotto拷貝.mp3" "troll_grotto.mp3"
rename_if_exists "375_Rise_of_the_Golem拷貝.mp3" "rise_of_the_golem.mp3"
rename_if_exists "382_Long_Rest拷貝.mp3" "long_rest.mp3"
rename_if_exists "389_Medieval_Market拷貝.mp3" "medieval_market.mp3"
rename_if_exists "394_Demon_Army拷貝.mp3" "demon_army.mp3"
rename_if_exists "406_Treacherous_Path拷貝.mp3" "treacherous_path.mp3"
rename_if_exists "407_Viking_Tavern拷貝.mp3" "viking_tavern.mp3"
rename_if_exists "418_Pagan_Woods拷貝.mp3" "pagan_woods.mp3"
rename_if_exists "419_Hidden_Passage拷貝.mp3" "hidden_passage.mp3"
rename_if_exists "42_Rise_of_the_Ancients拷貝.mp3" "rise_of_the_ancients.mp3"
rename_if_exists "435_The_Undercroft拷貝.mp3" "the_undercroft.mp3"
rename_if_exists "446_Between_Adventures拷貝.mp3" "between_adventures.mp3"
rename_if_exists "464_Petrified_Forest拷貝.mp3" "petrified_forest.mp3"
rename_if_exists "465_Light_the_Beacons拷貝.mp3" "light_the_beacons.mp3"
rename_if_exists "472_Ice_Mephit_Cavern拷貝.mp3" "ice_mephit_cavern.mp3"
rename_if_exists "474_Kingdom_of_Mist拷貝.mp3" "kingdom_of_mist.mp3"
rename_if_exists "62_Middle_Earth_Dawn拷貝.mp3" "middle_earth_dawn.mp3"
rename_if_exists "91_Elven_Glade拷貝.mp3" "elven_glade.mp3"
