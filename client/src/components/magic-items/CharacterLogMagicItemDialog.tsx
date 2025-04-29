import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import BaseMagicItemFields from './BaseMagicItemFields';
import { ItemType, ItemRarity, MagicItem, MagicItemRow } from "../../data/Types";

interface CharacterLogMagicItemDialogProps {
    open: boolean,
    handleClose: () => void,
    currentMagicItem: MagicItem | null,
    characterMagicItems: MagicItemRow[],
    isEarned: boolean,
    saveFunction: (newItem: MagicItem) => Promise<void>,
};

const CharacterLogMagicItemDialog = (props: CharacterLogMagicItemDialogProps) => {
    // Character & log id values fetched from URL params
    const { characterId, logId } = useParams();
    // Destructuring props
    const { open, characterMagicItems, currentMagicItem, isEarned } = props;
    // Default error message for required fields
    const requiredFieldErrorMessage = "This field is required.";

    // State object containing user-provided magic item info
    const [magicItem, setMagicItem] = useState({
        name: '' as string,
        flavorName: '' as string | null,
        type: null as ItemType | null,
        rarity: null as ItemRarity | null,
        isConsumable: false,
        requiresAttunement: false,
        description: '' as string | null,
        flavorDescription: '' as string | null,
        properties: '' as string | null,
        isEquipped: false,
        originLogId: null as string | null,
        lossLogId: null as string | null,
    });

    // State object containing error flags for fields requiring validation
    const [magicItemError, setMagicItemError] = useState({
        name: false,
        type: false,
        rarity: false,
    });

    // State object containing info on the magic item selected to lose
    const [magicItemToLose, setMagicItemToLose] = useState<MagicItemRow | null>(null);

    // State flag used to validate the magic item selected to lose
    const [magicItemToLoseError, setMagicItemToLoseError] = useState<boolean>(false);

    // Helper function triggered when updating the Magic Item to Lose field
    const handleMagicItemToLoseChange = (_: React.BaseSyntheticEvent, value: MagicItemRow | null) => {
        setMagicItemToLose(value);

        if (value) {
            setMagicItem({
                name: value.name,
                flavorName: value.flavorName === null ? '' : value.flavorName,
                type: value.type,
                rarity: value.rarity,
                isConsumable: !!value.isConsumable,
                requiresAttunement: !!value.requiresAttunement,
                description: value.description === null ? '' : value.description,
                flavorDescription: value.flavorDescription === null ? '' : value.flavorDescription,
                properties: value.properties === null ? '' : value.properties,
                isEquipped: value.isEquipped,
                originLogId: value.originLogId,
                lossLogId: value.lossLogId === null ? '' : value.lossLogId,
            });
        }
    };

    // Helper function triggered when updating an Autocomplete field
    const handleMagicItemAutocompleteChange = (_: React.BaseSyntheticEvent, value: ItemType | ItemRarity | string | null, fieldName: string) => {
        setMagicItem({ ...magicItem, [fieldName]: value });
    };
    // Helper function triggered when updating a Checkbox field
    const handleMagicItemCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setMagicItem({ ...magicItem, [fieldName]: event.target.checked });
    };
    // Helper function triggered when updating a text field
    const handleMagicItemTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setMagicItem({ ...magicItem, [fieldName]: event.target.value });
    };
    // Helper function triggered when validating a required field
    const handleRequiredFieldValidation = (fieldName: string) => {
        let dynamicKey = fieldName as keyof (typeof magicItem);
        setMagicItemError({ ...magicItemError, [fieldName]: (magicItem[dynamicKey] === null || magicItem[dynamicKey] === "") });
    };

    // Helper function triggered when closing the Delete Magic Item Confirmation dialog
    const handleMagicItemClose = () => {
        setMagicItem({
            name: '',
            flavorName: '',
            type: null,
            rarity: null,
            isConsumable: false,
            requiresAttunement: false,
            description: '',
            flavorDescription: '',
            properties: '',
            isEquipped: false,
            originLogId: null,
            lossLogId: null,
        });
        setMagicItemError({
            name: false,
            type: false,
            rarity: false,
        });
        setMagicItemToLose(null);
        setMagicItemToLoseError(false);
        props.handleClose();
    };

    // Helper function that validates magic item before adding it
    const handleSubmitMagicItem = async () => {
        let errorsFound: any = {};

        if (magicItem.name === null || magicItem.name === "")
            errorsFound['name'] = true;
        if (magicItem.type === null)
            errorsFound['type'] = true;
        if (magicItem.rarity === null)
            errorsFound['rarity'] = true;

        if (Object.keys(errorsFound).length === 0) {
            await cookAndSubmitMagicItem();
        } else {
            setMagicItemError({...magicItemError, ...errorsFound});
        }
    };

    const cookAndSubmitMagicItem = async () => {
        let rawMagicItem = {...magicItem};

        if (!rawMagicItem.flavorName) {
            rawMagicItem.flavorName = null;
        }
        if (!rawMagicItem.description) {
            rawMagicItem.description = null;
        }
        if (!rawMagicItem.flavorDescription) {
            rawMagicItem.flavorDescription = null;
        }
        if (!rawMagicItem.properties) {
            rawMagicItem.properties = null;
        }
        if (!rawMagicItem.lossLogId) {
            rawMagicItem.lossLogId = null;
        }

        let cookedMagicItem: MagicItem = {
            id: magicItemToLose ? magicItemToLose.id : '',
            name: rawMagicItem.name,
            flavorName: rawMagicItem.flavorName,
            type: rawMagicItem.type!,
            rarity: rawMagicItem.rarity!,
            isConsumable: rawMagicItem.isConsumable,
            requiresAttunement: rawMagicItem.requiresAttunement,
            description: rawMagicItem.description,
            flavorDescription: rawMagicItem.flavorDescription,
            properties: rawMagicItem.properties,
            isEquipped: rawMagicItem.isEquipped,
            characterId: characterId!,
            originLogId: isEarned && logId ? logId: rawMagicItem.originLogId!,
            lossLogId: !isEarned && logId ? logId: rawMagicItem.lossLogId
        };

        await props.saveFunction(cookedMagicItem);
        handleMagicItemClose();
    };

    useEffect(() => {
        if (currentMagicItem) {
            setMagicItem({
                name: currentMagicItem.name,
                flavorName: currentMagicItem.flavorName === null ? '' : currentMagicItem.flavorName,
                type: currentMagicItem.type,
                rarity: currentMagicItem.rarity,
                isConsumable: currentMagicItem.isConsumable,
                requiresAttunement: currentMagicItem.requiresAttunement,
                description: currentMagicItem.description === null ? '' : currentMagicItem.description,
                flavorDescription: currentMagicItem.flavorDescription === null ? '' : currentMagicItem.flavorDescription,
                properties: currentMagicItem.properties === null ? '' : currentMagicItem.properties,
                isEquipped: currentMagicItem.isEquipped,
                originLogId: currentMagicItem.originLogId,
                lossLogId: currentMagicItem.lossLogId === null ? '' : currentMagicItem.lossLogId,
            });
        }
    }, [currentMagicItem]);

    return (
        <Dialog
            open={open}
            onClose={handleMagicItemClose}
            aria-labelledby="magic-item-dialog-title"
            aria-describedby="magic-item-dialog-description"
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle id="magic-item-dialog-title">
                {`${currentMagicItem ? 'View' : 'New' }${isEarned ? ' Earned' : ' Lost'} Magic Item`}
            </DialogTitle>
            <DialogContent>
                <Grid 
                    container 
                    direction="row" 
                    justifyContent="center" 
                    rowSpacing={2}
                    columnSpacing={2}
                    sx={{
                        pb: 2,
                        pr: 4,
                        ml: "auto",
                        mr: "auto",

                    }}
                >
                    { !isEarned && !currentMagicItem &&
                        <Grid item xs={12}>
                            <Autocomplete 
                                id="magic-item-to-lose"
                                options={characterMagicItems.sort((a,b) => -(b.flavorName ? b.flavorName : b.name).localeCompare(a.flavorName ? a.flavorName : a.name)) || []}
                                getOptionKey={(o) => o.id}
                                getOptionLabel={(o) => (o.flavorName ? `${o.flavorName} (${o.name})` : o.name) + ` [${o.originLogTitle}]`}
                                onChange={(e, v) => handleMagicItemToLoseChange(e, v)}
                                onBlur={_ => setMagicItemToLoseError(magicItemToLose == null)}
                                value={magicItemToLose}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        error={magicItemToLoseError} 
                                        required 
                                        label="Magic Item" 
                                        helperText={magicItemToLoseError ? requiredFieldErrorMessage : ''}
                                    />
                                )}
                            />
                        </Grid>
                    }
                    { (isEarned || currentMagicItem || magicItemToLose) &&
                        <BaseMagicItemFields
                            magicItem={magicItem}
                            magicItemError={magicItemError}
                            isViewing={!isEarned || currentMagicItem != null}
                            requiredFieldErrorMessage={requiredFieldErrorMessage}
                            handleMagicItemAutocompleteChange={handleMagicItemAutocompleteChange}
                            handleMagicItemCheckboxChange={handleMagicItemCheckboxChange}
                            handleMagicItemTextChange={handleMagicItemTextChange}
                            handleRequiredFieldValidation={handleRequiredFieldValidation}
                        />
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleMagicItemClose}>Close</Button>
                { !currentMagicItem && (isEarned || magicItemToLose) &&
                    <Button onClick={handleSubmitMagicItem} autoFocus>
                        Save
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default CharacterLogMagicItemDialog;