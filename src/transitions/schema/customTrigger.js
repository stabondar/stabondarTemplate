export const customTrigger = (trigger, classEl) =>
{
    return (
        trigger !== "back" &&
        trigger !== "forward" &&
        trigger.classList.contains(classEl) &&
        window.innerWidth > 1024
    )
}