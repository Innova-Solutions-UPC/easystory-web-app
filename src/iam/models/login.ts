export class Login {
    m_email: string | null = null;
    m_password: string | null = null;

    /********************
     * Getters / Setters
     ********************/

    get email(): string | null{
        return this.m_email;
    }
    set email(p_value: string | null){
        this.m_email = p_value;
    }

    get password(): string | null{
        return this.m_password;
    }
    set password(p_value: string | null){
        this.m_password = p_value;
    }

}
