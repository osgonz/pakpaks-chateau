import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ItemTypeDictionary, ItemRarityDictionary } from '../../data/Dictionaries';
import { ItemType, ItemRarity } from '../../data/Types';

interface BaseMagicItemFieldsProps {
    magicItem: any,
    magicItemError: any,
    isViewing: boolean,
    requiredFieldErrorMessage: string,
    handleMagicItemAutocompleteChange: (_: React.BaseSyntheticEvent, value: ItemType | ItemRarity | string | null, fieldName: string) => void,
    handleMagicItemCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => void,
    handleMagicItemTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
    handleRequiredFieldValidation: (fieldName: string) => void,
};

const BaseMagicItemFields = (props: BaseMagicItemFieldsProps) => {
    // Array containing Magic Item Type and Rarity ids for Autocomplete fields
    const magicItemTypeArray = Array.from(ItemTypeDictionary.keys());
    const magicItemRarityArray = Array.from(ItemRarityDictionary.keys());

    // Destructuring props
    const { magicItem, magicItemError, isViewing, requiredFieldErrorMessage } = props;

    return (
        <>
            <Grid item xs={12}>
                <TextField 
                    error={magicItemError.name}
                    disabled={isViewing}
                    required
                    id="magic-item-name"
                    label="Name"
                    helperText={magicItemError.name ? requiredFieldErrorMessage : ''}
                    onChange={e => props.handleMagicItemTextChange(e, "name")}
                    onBlur={_ => props.handleRequiredFieldValidation("name")}
                    value={magicItem.name}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={isViewing}
                    id="magic-item-flavor-name"
                    label="Flavor Name"
                    onChange={e => props.handleMagicItemTextChange(e, "flavorName")}
                    value={magicItem.flavorName}
                    fullWidth
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <Autocomplete 
                    disabled={isViewing}
                    id="magic-item-type"
                    options={magicItemTypeArray}
                    getOptionLabel={(o) => ItemTypeDictionary.get(o) || ''}
                    onChange={(e, v) => props.handleMagicItemAutocompleteChange(e, v, "type")}
                    onBlur={_ => props.handleRequiredFieldValidation("type")}
                    value={magicItem.type}
                    fullWidth
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            error={magicItemError.type} 
                            required 
                            label="Type" 
                            helperText={magicItemError.type ? requiredFieldErrorMessage : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <Autocomplete 
                    disabled={isViewing}
                    id="magic-item-rarity"
                    options={magicItemRarityArray}
                    getOptionLabel={(o) => ItemRarityDictionary.get(o) || ''}
                    onChange={(e, v) => props.handleMagicItemAutocompleteChange(e, v, "rarity")}
                    onBlur={_ => props.handleRequiredFieldValidation("rarity")}
                    value={magicItem.rarity}
                    fullWidth
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            error={magicItemError.rarity} 
                            required 
                            label="Rarity" 
                            helperText={magicItemError.rarity ? requiredFieldErrorMessage : ''}
                        />
                    )}
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControlLabel 
                    label="Consumable"
                    control={
                        <Checkbox 
                            disabled={isViewing}
                            checked={magicItem.isConsumable}
                            onChange={e => props.handleMagicItemCheckboxChange(e, "isConsumable")}
                        />
                    }
                />
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControlLabel 
                    label="Attunement"
                    control={
                        <Checkbox 
                            disabled={isViewing}
                            checked={magicItem.requiresAttunement}
                            onChange={e => props.handleMagicItemCheckboxChange(e, "requiresAttunement")}
                        />
                    }
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={isViewing}
                    id="magic-item-description"
                    label="Description"
                    onChange={e => props.handleMagicItemTextChange(e, "description")}
                    value={magicItem.description}
                    multiline
                    rows={6}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={isViewing}
                    id="magic-item-flavor-description"
                    label="Flavor Description"
                    onChange={e => props.handleMagicItemTextChange(e, "flavorDescription")}
                    value={magicItem.flavorDescription}
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={isViewing}
                    id="magic-item-properties"
                    label="Properties"
                    onChange={e => props.handleMagicItemTextChange(e, "properties")}
                    value={magicItem.properties}
                    multiline
                    rows={3}
                    fullWidth
                />
            </Grid>
        </>
    );
};

export default BaseMagicItemFields;