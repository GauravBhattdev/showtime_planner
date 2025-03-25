function validateConcertQueryParams(query){
  let errors = [];
    if(!query.artist){
        errors.push("Artist is required.") 
    }
    if(!query.city){
        errors.push("City is required.") 
    }
    return errors;
}

function validateMerchandiseStallsQueryParams(query){
    let errors = [];
    if(!query.stallName){
        errors.push("StallName is must required.")
    }
    return errors;
}

function validateAfterPartiesQueryParams(query){
    let errors = [];
    if(!query.city){
        errors.push("City is must required")
    }
    return errors;
}

module.exports = {validateConcertQueryParams,validateMerchandiseStallsQueryParams
    ,validateAfterPartiesQueryParams}