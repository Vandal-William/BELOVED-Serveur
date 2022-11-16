import { generate, verify } from 'password-hash'; // npm i bcrypt 
import { validate } from 'email-validator'; // npm i email-validator
import passwordValidate from 'password-validator'; // npm i password-validator
import { ok } from 'assert'; // module native a nodejs

// import { User } from '../models';  je require les modèles dont j'ai besoin

// Create a schema
const schema = new passwordValidate();
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


   
    export async function signUp(req, res){
        try{
            // 1. Je vérifie que l'email est unique
            const user = await User.findOne({
                where: {
                email: req.body.email
                }
            });
            // 2. si l'email n'est pa unique je renvoie une erreur
            ok(!Boolean(user), `L'utilisateur ${req.body.email} existe déjà`);
            // 3. je vérifie avec le module 'email-validator' si il s'agie bien d'une adresse mail
            ok(validate(req.body.email), `${req.body.email} n'est pas un email valide.`);
            // 4. je vérifie que les mots de passes correspondent
            ok(req.body.password === req.body.confirmPassword, `Les mots de passes ne correspondent pas`);
            // 5. je vérifi que le mot de passe correspond aux critéré définie ligne 13
            ok(schema.validate(req.body.password), `Le mot de passe ne remplit pas les critères`);
            // 6. je hashe le mot de passe avec bcrypt avent de l'ajouter dans la bdd
            const encryptedPwd = await generate(req.body.password);

            // 7. J'ajoute l'utilisateur dans la bdd
            const newUser = await User.create({
                ...req.body, // spread operateur : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Spread_syntax
                password: encryptedPwd
            });

            res.json('ok');

        }catch(error){
            console.error(error);
        }
    }

    export async function login(req, res){
        // 1. Je je regarde ci il y a bien un user avec cette email
        const user = await User.findOne({
            where: {
            email: req.body.email
            }
        });
            // si le user existe:
            if (user) {
                // je compare le mdp avec celui dans la BDD
                const match = await verify(req.body.password, user.password);
                // si c'est ok:
                if (match) {
                    //je renvoie le user
                    res.json(user);
                //Sinon:
                } else {
                // si mauvais user ou mdp
                res.json('utilisateur ou mot de passe incorrect');
                }
            } else {
            // si user non trouvé
            res.json('utilisateur ou mot de passe incorrect');
            }
        }
