function Demo(){
    var radioOptions = [
        { value: 'newspaper', label: 'Newspaper'},
        { value: 'radio', label: 'Radio'},
        { value: 'tv', label: 'Television'},
        { value: 'search', label: 'Search Engine'},
        { value: 'social', label: 'Social Media'}
    ];

    return (
        <div className="container">
            <h1>React.js group demo</h1>
            <form action="">
                <p className="h3">How did you hear about us?</p>

                <RadioOptionGroup 
                    name="referrer"
                    other={true} 
                    options={radioOptions}>
                </RadioOptionGroup>

                <p><input type="submit"/></p>

            </form>
        </div>
    );
};
