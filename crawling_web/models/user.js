module.exports =  
    (sequelize, DataTypes) => {
        return sequelize.define('user', {

            //회원 아이디
            user_id : {                                             
                type: DataTypes.STRING(50),
                allowNull : false,
                primaryKey: true
            },   
            
            //회원 네임
            name : {                                             
                type: DataTypes.STRING(50),
                allowNull : false,
            },    

            //회원 eamil
            email : {                                            
                type:DataTypes.STRING(40),              
                allowNull : false,
                validate:{
                    isEmail:true
                },
            }

            // //회원가입 시간
            // created_at : {
            //     type:DataTypes.DATE,
            //     allowNull:false,
            //     defaultValue : DataTypes.NOW,       //기본적으로는 현재시간을 지칭
            // }
        },
        //세번째 인자는 테이블 옵션
        {timestamps : false,
         charset : 'utf8',
         collate : 'utf8_general_ci'}   //define 메서드
        );                              // true : createdAt, updateAt 자동으로 컬럼추가됨  
                                        //deleteAt
                                        //컬럼 추가됨 p,273 기타테이블옵션 참고 paranoid : true
    };
    //273p참조 기타테이블옵션