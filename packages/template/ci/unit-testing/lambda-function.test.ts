const Main = async () => {
    for ( let i = 0; i < 1; i++ ) {
        describe( [ "Lambda Unit Test", "", [ "(", i + 1, ")" ].join( "" ) ].join( " " ), () => {
            jest.setTimeout( 60 * 1000 );

            it( [ "Asynchronous Invocation", [ "(", i + 1, ")" ].join( "" ) ].join( " " ), async () => {
                const Lamba = await import("@iac-factory/esm-lambda-example");

                const { Function } = await import("ts-lambda");

                const event = Function.default.events;
                const context = Function.default.contexts;

                const response = await Lamba.handler(event, context);

                console.debug("[Debug] Function", "(Response)", {
                    status: response.statusCode,
                    body: JSON.parse(response.body)
                });

                expect( response ).toBeTruthy();
            } );
        } );
    }
};

(async () => await Main())()
