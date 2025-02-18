import { restartWebflow } from '@finsweet/ts-utils';

export const RestartWebflow = async (data) =>
{
    window.Webflow ||= []
    window.Webflow.push(async () =>
    {
        restartWebflow()
    })
}