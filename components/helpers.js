import leven from 'leven';

export const CORRECT_ANSWER_POINTS = 100;

export const getPlayer = (squad, id) => squad.find((player) => player.player_id === id);

export const getLastName = (player) => {
    const playerNameArray = player.player_name.split(' ');
    return playerNameArray[playerNameArray.length - 1];
};

export const isCorrectSpelling = (string1, string2) => {
    const trimmedString1 = string1.toLowerCase().trim();
    const trimmedString2 = string2.toLowerCase().trim();
    const levenScore = leven(trimmedString1, trimmedString2);
    return levenScore <= 3;
};

export const isCorrectPlayer = (player, key, answers, squad) => {
    const squadPlayer = getPlayer(squad, player.player);
    const answer = answers[key];
    const playerLastName = getLastName(squadPlayer);
    return isCorrectSpelling(playerLastName, answer);
};

export const correctScore = (answers, squad, lineup) => {
    let score = 0;
    const {
    // eslint-disable-next-line
    goal_keeper,
        defenders,
        // eslint-disable-next-line
    midfield_defense,
        // eslint-disable-next-line
    midfield_offense,
        striker,
    } = lineup;

    goal_keeper.forEach((goalKeeper, index) => {
        const key = `goal_keeper-${index}`;
        if (isCorrectPlayer(goalKeeper, key, answers, squad)) {
            score += CORRECT_ANSWER_POINTS;
        }
    });

    defenders.forEach((defender, index) => {
        const key = `defender-${index}`;
        if (isCorrectPlayer(defender, key, answers, squad)) {
            score += CORRECT_ANSWER_POINTS;
        }
    });

    if (midfield_defense.lenght > 0) {
        midfield_defense.forEach((midfieldDefender, index) => {
            const key = `midfield_defense-${index}`;
            if (isCorrectPlayer(midfieldDefender, key, answers, squad)) {
                score += CORRECT_ANSWER_POINTS;
            }
        });
    }

    if (midfield_offense.lenght > 0) {
        midfield_offense.forEach((midfieldAttacker, index) => {
            const key = `midfield_offense-${index}`;
            if (isCorrectPlayer(midfieldAttacker, key, answers, squad)) {
                score += CORRECT_ANSWER_POINTS;
            }
        });
    }

    striker.forEach((strikerPlayer, index) => {
        const key = `striker-${index}`;
        if (isCorrectPlayer(strikerPlayer, key, answers, squad)) {
            score += CORRECT_ANSWER_POINTS;
        }
    });

    return score;
};
