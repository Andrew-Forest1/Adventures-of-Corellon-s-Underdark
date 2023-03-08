function BattleLog({actions}){

    const displayActions = actions.map(action => action.combatent !== "player" ? <span>{action.action}</span> : <p>{action.action}</p>)

    return (
        <div className="BattleLog">
            {displayActions}
        </div>
    )
}

export default BattleLog