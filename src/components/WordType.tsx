function WordType(props: {incShowAll: boolean, currentValue: string, eventHandler: (selectedValue: string) => void}){
    const {incShowAll, currentValue, eventHandler} = props;
    
    if (incShowAll === true) {
        return (
            <div className="relative mt-2 rounded-md shadow-sm">
                <select id="modalType" name="modalType" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" aria-label="Word type" onChange={(event) => eventHandler(event.target.value)}>
                    <option defaultValue={""} value="">All words</option>
                    <option value="noun">Nouns</option>
                    <option value="verb">Verbs</option>
                    <option value="adjective">Adjectives</option>
                    <option value="pronoun">Pronouns</option>
                    <option value="adverb">Adverbs</option>
                    <option value="interjection">Interjections</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>
        );
    }

    return (
        <div className="relative rounded-md shadow-sm">
            <select id="modalType" name="modalType" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" aria-label="Word type" value={currentValue} onChange={(event) => eventHandler(event.target.value)}>
                <option value="noun">Nouns</option>
                <option value="verb">Verbs</option>
                <option value="adjective">Adjectives</option>
                <option value="pronoun">Pronouns</option>
                <option value="adverb">Adverbs</option>
                <option value="interjection">Interjections</option>
                <option value="unknown">Unknown</option>
            </select>
        </div>
    );
}

export default WordType;