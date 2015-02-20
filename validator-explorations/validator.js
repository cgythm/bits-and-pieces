(function(){
    function namespacer(fn, ext){
        ext = ext || {};
    };

    this.badmove1 = namespacer(function(){
        function validate(test, pass, fail){
            var fn = function(input){
                return test(input);
            };
            fn.pass = pass;
            fn.fail = fail;
            return fn;
        };

        function condition1(validator){
            return function(value){
                var ret = validator(value);
                if(ret){
                    validator.pass();
                }else{
                    validator.fail();
                }
                return ret;
            };
        };

        this.validate = validate;
        this.condition = condition1;
    })

    this.badmove2 = namespacer(function(){

        //major weakness, what if we want to pass
        //the value to our pass/fail functions because
        //we want to do something with the value?
        //we can't through here because conclusion produces
        //a closure that takes a boolean value to determine
        //which closure to invoke. the branch determination
        //logic which facilitates the flow to a different path
        //is done here without awareness of our 'test' by
        //determining JUST the ok-parameter value
        this.conclusion = function conclusion(pass, fail){
            var fn = function(ok){
                return ok ? pass() : fail();
            }
            return fn;
        }

        this.condition = function condition(test, concluding){
            return function(value){
                var ret = test(value);
                return concluding(ret);
            }
        };

        this.validate = function(test, pass, fail){
            var fn = condition(test, conclusion(pass, fail))
            return fn;
        };
    });

    this.move2 = namespacer(function(){
        this.validate = function validate(test, pass, fail){
            var fn = function(input){
                return test(input) ? pass(input) : fail(input);
            }
        }
        return this;
    });


    this.validator3 = namespacer(function(){
        function subpub(f, p){
            this.f = f;
            this.p = p;
        }

        function validator(test){
            var f = [], p = [];

            this.validate = function(value){

            }
        }
        this.validator = validator;
    });

}).call(this);
