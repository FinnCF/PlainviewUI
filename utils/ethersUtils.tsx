export async function getBlockDatetime(provider, blockNumber) {
    try {
        const block = await provider.getBlock(blockNumber);
        console.log("Block:", block);

        // Convert bigint timestamp to a number for the Date constructor
        const timestamp = Number(block.timestamp);
        const date = new Date(timestamp * 1000);  // Convert seconds to milliseconds
        console.log("Date:", date);

        return date.toLocaleString();
    } catch (error) {
        console.error("Failed to fetch block:", error);
        return null;
    }
}
