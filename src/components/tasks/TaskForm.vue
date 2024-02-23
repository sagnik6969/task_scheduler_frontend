<template>
    <div class="h-screen w-full flex items-center justify-center bg bg-slate-200">
        <div class="py-3 px-5 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white">
            <input class="px-0 text-xl border-none focus:[box-shadow:none]" type="text" placeholder="Title" />
            <textarea class="px-0 resize-none border-none focus:[box-shadow:none]" rows="10"
                placeholder="Add description..."></textarea>
            <div class="mb-2 text-slate-600 flex items-center justify-between">
                <button
                    class="py-2 px-2 space-x-2 flex items-center font-medium hover:bg-slate-100 rounded-md duration-300">
                    <v-icon icon="mdi-calendar-range"></v-icon>
                    <span>Set Due Date</span>
                </button>
                <label class="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-md">
                    <v-icon icon="mdi-priority-high"></v-icon>
                    <select
                        class="p-0 font-medium border-non appearance-none border-none focus:[box-shadow:none] bg-transparent bg-img">
                        <option hidden selected>Select Task Priority</option>
                        <option value="normal">Normal</option>
                        <option value="important">Important</option>
                        <option value="very_important">Very Important</option>
                    </select>
                </label>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-image: none;
}
</style>