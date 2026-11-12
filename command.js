const commands = [];

// Command Register කරන ප්‍රධාන Function එක
export function cmd(info, func) {
    const data = info;
    data.function = func;

    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!data.desc) data.desc = '';
    if (!data.category) data.category = 'misc';
    if (!data.filename) data.filename = "Not Provided";
    
    // Command එක Array එකට එකතු කිරීම
    commands.push(data);
    return data;
}

export { commands };