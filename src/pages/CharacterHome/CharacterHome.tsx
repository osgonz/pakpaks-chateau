import { useParams } from "react-router-dom";
import useCharacter from "../../hooks/useCharacter";

function CharacterHome() {
    const { characterId } = useParams();
    const character = useCharacter(characterId!);

    return (
        <>
            {
                character ? (
                    <>
                        <h1>{character.name}</h1>
                        <p>{character.lineage} {character.classes}</p>
                    </>
                )
                : (
                    <p>Loading...</p>
                )
            }
        </>
    )
};

export default CharacterHome;