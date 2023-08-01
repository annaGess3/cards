const baseURL = 'https://deckofcardsapi.com/api/deck/';

async function sendFetch(url: string) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        return error;
    }
}

async function getDeckID() {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    const res = await sendFetch(url);
    return res.deck_id;
}

async function getOneDeck(deckID: string) {
    const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`;
    const res = await sendFetch(url);
    return res;
}

async function reshuffleDeck(deckID: string) {
    const url = `${baseURL}/${deckID}/shuffle/`;
    const res = await sendFetch(url);
    return res.deck_id;
}

export {
    baseURL,
    getDeckID,
    sendFetch,
    getOneDeck,
    reshuffleDeck,
}