#include "checklist.h"
#include "util.h"

// persistent storage keys
#define PERSIST_KEY_CHECKLIST_LENGTH       100
#define PERSIST_KEY_CHECKLIST_NUM_CHECKED  101

// the checklist will occupy storage keys from 200 to 200 + MAX_CHECKLIST_ITEMS
// #define PERSIST_KEY_CHECKLIST_ITEM_FIRST  200
#define PERSIST_KEY_CHECKLIST_BLOCK_FIRST  300

static ChecklistItem s_checklist_items[MAX_CHECKLIST_ITEMS];

static int s_checklist_length;
static int s_checklist_num_checked;

// storage parameters
static int s_items_per_block;
static int s_block_size;

// "Private" functions
void read_data_from_storage();
void save_data_to_storage();
void add_item(char* name);

void checklist_init() {
  // determine storage params
  s_items_per_block =  PERSIST_DATA_MAX_LENGTH / sizeof(ChecklistItem);
  s_block_size = sizeof(ChecklistItem) * s_items_per_block;

  read_data_from_storage();
}

void checklist_deinit() {
  save_data_to_storage();
}

void read_data_from_storage() {
  printf("reading data");
  // load checklist information from storage
  s_checklist_length = persist_read_int(PERSIST_KEY_CHECKLIST_LENGTH);
  s_checklist_num_checked = persist_read_int(PERSIST_KEY_CHECKLIST_NUM_CHECKED);

  // load the checklist by the block
  int num_blocks_required = s_checklist_length / s_items_per_block + 1;

  for(int block = 0; block < num_blocks_required; block++) {
    persist_read_data(PERSIST_KEY_CHECKLIST_BLOCK_FIRST + block,
                       &s_checklist_items[block * s_items_per_block],
                       s_block_size);
  }
}

void save_data_to_storage() {
  // save checklist information
  persist_write_int(PERSIST_KEY_CHECKLIST_LENGTH, s_checklist_length);
  persist_write_int(PERSIST_KEY_CHECKLIST_NUM_CHECKED , s_checklist_num_checked);

  // save the rest of the checklist
  // calculate how many persist blocks we'll need
  int num_blocks_required = s_checklist_length / s_items_per_block + 1;

  for(int block = 0; block < num_blocks_required; block++) {
    persist_write_data(PERSIST_KEY_CHECKLIST_BLOCK_FIRST + block,
                       &s_checklist_items[block * s_items_per_block],
                       s_block_size);
  }
}

int checklist_get_num_items() {
  return s_checklist_length;
}

int checklist_get_num_items_checked() {
  return s_checklist_num_checked;
}

void checklist_add_items(char* name) {
  // strncpy(line, name, MAX_NAME_LENGTH - 1);
  char line[MAX_NAME_LENGTH], token[MAX_NAME_LENGTH];

  while(name != NULL) {
      name = strwrd(name, token, sizeof(token), ".,");
      add_item(token);
  }

  // save the new checklist information
  save_data_to_storage();
}

void add_item(char* name) {
  if(s_checklist_length < MAX_CHECKLIST_ITEMS && strlen(trim_whitespace(name)) > 0) {
    strncpy(s_checklist_items[s_checklist_length].name, trim_whitespace(name), MAX_NAME_LENGTH - 1);
    s_checklist_items[s_checklist_length].is_checked = false;
    s_checklist_items[s_checklist_length].sublist_id = 0;

    s_checklist_length++;
  } else {
    APP_LOG(APP_LOG_LEVEL_WARNING, "Failed to add checklist item; list exceeded maximum size.");
  }
}

void checklist_item_toggle_checked(int id) {
  s_checklist_items[id].is_checked = !(s_checklist_items[id].is_checked);

  if(s_checklist_items[id].is_checked) {
    s_checklist_num_checked++;
  } else {
    s_checklist_num_checked--;
  }

  // save the edited item to persist
  save_data_to_storage();

  // printf("Num items checked: %i, Num items: %i", checklist_get_num_items_checked(), checklist_get_num_items());
}

int checklist_delete_completed_items() {
  // Clear the completed items
  int num_deleted = 0;

  int i = 0;

  while (i < s_checklist_length) {
    if(s_checklist_items[i].is_checked) { // is the item checked?
      // delete the item by shuffling the array backwards
      memmove(&s_checklist_items[i], &s_checklist_items[i+1], sizeof(s_checklist_items[0])*(s_checklist_length - i));

      num_deleted++;
      s_checklist_length--;
    } else {
      i++;
    }
  }

  s_checklist_num_checked -= num_deleted;

  // it takes too much time to rewrite the entire persistent store, so don't save immediately
  save_data_to_storage();

  return num_deleted;
}

ChecklistItem* checklist_get_item_by_id(int id) {
  return &s_checklist_items[id];
}
